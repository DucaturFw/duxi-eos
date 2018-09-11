import { IContext } from './context';

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export function important<T>(value?: T, message?: string): T {
  if (typeof value === 'undefined') {
    throw new Error(message || 'Important value is undefined');
  }
  return value;
}

export type ContextDependFunc = (
  ctx: Partial<IContext>
) => (...args: any[]) => Promise<any>;
export type ContextFields = keyof IContext;

export function inside<TValue>(
  func: (ctx: Partial<IContext>) => Promise<TValue>,
  reducer: (ctx: Partial<IContext>, value: TValue) => Partial<IContext>
): (ctx: Partial<IContext>) => Promise<Partial<IContext>> {
  return (ctx: Partial<IContext>) => {
    return func(ctx).then(result => reducer(ctx, result));
  };
}

export function sequence(
  ...funcs: ((ctx: Partial<IContext>) => Promise<Partial<IContext>>)[]
): (ctx: Partial<IContext>) => Promise<Partial<IContext>> {
  return async (ctx: Partial<IContext>) => {
    for (let func of funcs) {
      ctx = await func(ctx);
    }

    return ctx;
  };
}

export function replace(field: ContextFields) {
  return (ctx: Partial<IContext>, value: any) => ({
    ...ctx,
    [field]: value
  });
}

export function nothing(ctx: Partial<IContext>) {
  return ctx;
}
