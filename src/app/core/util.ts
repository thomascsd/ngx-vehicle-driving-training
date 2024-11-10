import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { validateSync } from 'class-validator';

export type Unpacked<T> = T extends Array<infer U> ? U : T;

export type ToForm<OriginalType> = {
  [key in keyof OriginalType]: OriginalType[key] extends Array<any>
    ? FormArray<
        Unpacked<OriginalType[key]> extends object
          ? FormGroup<ToForm<Unpacked<OriginalType[key]>>>
          : FormControl<Unpacked<OriginalType[key]> | null>
      >
    : OriginalType[key] extends object
      ? FormGroup<ToForm<OriginalType[key]>>
      : FormControl<OriginalType[key] | null>;
};

export function utilValidator<T extends Record<string, any>>(
  model: T,
  prop: string,
): ValidatorFn {
  return (control): ValidationErrors | null => {
    let invalid = false;

    (model as any)[prop] = control.value;

    const errors = validateSync(model, {
      skipMissingProperties: true,
    });

    if (errors && errors.length) {
      const propError = errors.filter((e) => e.property == prop);

      if (propError.length > 0) {
        const message = propError.map(({ constraints }) =>
          Object.values(constraints || {}).join(', '),
        );
        invalid = true;

        return {
          hasError: invalid && (control.dirty || control.touched),
          message: message,
        };
      }
    }

    return null;
  };
}
