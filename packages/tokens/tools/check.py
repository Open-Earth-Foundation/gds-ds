"""Checks the GDS token files against TOKENS.md sections 3, 5 and 8. Run from the repo root."""
import json, re, sys, pathlib

root = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path(".")
T = root / "tokens"

def load(p):
    return json.loads((p).read_text())

def walk(node, path=(), out=None):
    out = out if out is not None else {}
    for k, v in node.items():
        if k.startswith("$"):
            continue
        if isinstance(v, dict) and "$value" in v:
            out[".".join(path + (k,))] = v
        elif isinstance(v, dict):
            walk(v, path + (k,), out)
    return out

def refs(value):
    s = json.dumps(value)
    return re.findall(r"\{([a-z0-9.\-]+)\}", s)

prim = walk(load(T / "primitives.tokens.json"))
base = walk(load(T / "semantic/base.tokens.json"))
light = walk(load(T / "semantic/color.light.tokens.json"))
dark = walk(load(T / "semantic/color.dark.tokens.json"))
comp = walk(load(T / "components.tokens.json"))
sem = {**base, **light}

errors = []

# tier 1: no references
for p, t in prim.items():
    if refs(t["$value"]):
        errors.append(f"tier1 has reference: {p}")

# tier 2: references into tier 1 only, all resolve
for name, tier in (("base", base), ("light", light), ("dark", dark)):
    for p, t in tier.items():
        rs = refs(t["$value"])
        if not rs and name != "base":
            errors.append(f"tier2 {name} raw value: {p}")
        for r in rs:
            if r not in prim:
                errors.append(f"tier2 {name} {p} -> {r} not in tier1")

# tier 3: references into tier 2 only
for p, t in comp.items():
    rs = refs(t["$value"])
    if not rs:
        errors.append(f"tier3 raw value: {p}")
    for r in rs:
        if r not in sem:
            where = "tier1" if r in prim else "missing"
            errors.append(f"tier3 {p} -> {r} ({where})")

# mode parity
if set(light) != set(dark):
    errors.append(f"mode parity: only in light {sorted(set(light)-set(dark))}; only in dark {sorted(set(dark)-set(light))}")

# naming grammar
grammar = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)+$")
for p in list(prim) + list(sem) + list(dark) + list(comp):
    if not grammar.match(p):
        errors.append(f"naming: {p}")

# contrast on ramps (TOKENS.md section 5)
def lum(hex_):
    h = hex_.lstrip("#")[:6]
    rgb = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]

def contrast(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

ramp_report = []
for hue in ("neutral", "blue", "green", "amber", "red"):
    for mode in ("light", "dark"):
        g = lambda s: prim[f"color.{hue}.{mode}.{s}"]["$value"]
        checks = {
            "11 on 1": contrast(g(11), g(1)), "11 on 2": contrast(g(11), g(2)),
            "12 on 1": contrast(g(12), g(1)), "12 on 5": contrast(g(12), g(5)),
            "9 on 1": contrast(g(9), g(1)), "9 on 2": contrast(g(9), g(2)),
        }
        for k, v in checks.items():
            need = 3.0 if k.startswith("9") else 4.5
            flag = "" if v >= need else "  FAIL"
            ramp_report.append(f"{hue}.{mode} {k}: {v:.2f}{flag}")
            if v < need:
                errors.append(f"contrast {hue}.{mode} {k} = {v:.2f} < {need}")

# no full path exists in two tiers (TOKENS.md section 4)
for p in set(prim) & (set(sem) | set(dark) | set(comp)):
    errors.append(f"path in two tiers: {p}")
for p in set(sem) & set(comp):
    errors.append(f"path in two tiers: {p}")

# text.tertiary on surface.base (documented as large-text only)
for mode, tier in (("light", light), ("dark", dark)):
    def resolve(p):
        v = tier[p]["$value"]
        r = refs(v)
        return prim[r[0]]["$value"] if r else v
    for role in ("primary", "secondary", "tertiary"):
        c = contrast(resolve(f"color.text.{role}"), resolve("color.surface.base"))
        ramp_report.append(f"{mode} text.{role} on surface.base: {c:.2f}")

print(f"tokens: tier1 {len(prim)}, tier2 base {len(base)}, light {len(light)}, dark {len(dark)}, tier3 {len(comp)}")
print("\n".join(ramp_report))
if errors:
    print("\nERRORS:")
    print("\n".join(errors))
    sys.exit(1)
print("\nOK: all rules pass")
