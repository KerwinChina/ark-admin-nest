import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { isNumber } from 'lodash';
import {
  ToArray,
  ToBoolean,
  ToDate,
  ToLowerCase,
  ToNumber,
  ToTrim,
  ToUpperCase,
} from './transform.decorator';

interface IOptionalOptions {
  required?: boolean;
}

interface INumberFieldOptions extends IOptionalOptions {
  each?: boolean;
  int?: boolean;
  min?: number;
  max?: number;
  positive?: boolean;
}
export function NumberField(
  options: INumberFieldOptions = {},
): PropertyDecorator {
  const decorators = [ToNumber()];

  const { each, min, max, int, positive, required = true } = options;

  if (each) {
    decorators.push(ToArray());
  }

  if (int) {
    decorators.push(IsInt({ each }));
  } else {
    decorators.push(IsNumber({}, { each }));
  }

  if (isNumber(min)) {
    decorators.push(Min(min));
  }

  if (isNumber(max)) {
    decorators.push(Max(max));
  }

  if (positive) {
    decorators.push(IsPositive({ each }));
  }

  if (!required) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}

interface IStringFieldOptions extends IOptionalOptions {
  min?: number;
  max?: number;
  lowerCase?: boolean;
  upperCase?: boolean;
}
export function StringField(
  options: IStringFieldOptions = {},
): PropertyDecorator {
  const decorators = [IsNotEmpty(), IsString(), ToTrim()];

  const { min, max, lowerCase, upperCase, required = true } = options;

  if (isNumber(min)) {
    decorators.push(MinLength(min));
  }

  if (isNumber(max)) {
    decorators.push(MaxLength(max));
  }

  if (lowerCase) {
    decorators.push(ToLowerCase());
  }

  if (upperCase) {
    decorators.push(ToUpperCase());
  }

  if (!required) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}

export function BooleanField(
  options: IOptionalOptions = {},
): PropertyDecorator {
  const decorators = [ToBoolean(), IsBoolean()];

  const { required = true } = options;

  if (!required) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}

export function DateField(options: IOptionalOptions = {}): PropertyDecorator {
  const decorators = [ToDate(), IsDate()];

  const { required = true } = options;

  if (!required) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
