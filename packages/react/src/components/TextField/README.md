# TextField

A labelled text input with description or error. Composition of Base UI `Field` (state, validation, label wiring) and `Input`.

## Anatomy

```
.gds-text-field[data-invalid][data-disabled][data-focused][data-filled]
  .gds-text-field__label        (+ .gds-text-field__required)
  .gds-text-field__control      the visible box: border, background, radius
    .gds-text-field__input      the <input>, unstyled inside the box
    .gds-text-field__suffix?    unit or currency
  .gds-text-field__help | .gds-text-field__error
```

State lives on the field root, not on the input, so every part can react to it (principle: container state on the wrapper).

## Props

`label` (required), `description`, `error` (sets invalid), `suffix`, `required`, `disabled`, `name`, plus every `<input>` prop.

## Tokens

`input.*` for the box, `input.help-fg` / `input.error-fg` for the messages, `type.label.md` for the label.

## Do and don't

- Error text says what to do, not what went wrong: "Enter a whole number", not "Invalid value".
- Required is marked in words, never only with a colour or an asterisk (principle 5).
- Numbers with units get a suffix; never put the unit in the placeholder.
