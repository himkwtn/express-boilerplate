import { asyncWrap } from "./utils";

export const asyncRequestHandler = (target, propertyKey, descriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = asyncWrap(originalMethod);
  return descriptor;
};

export const log = ({
  query = [],
  body = [],
  params = []
}: {
  [key: string]: string[];
}) => (target, propertyKey, descriptor) => {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
  }
  const originalMethod = descriptor.value;
  descriptor.value = function() {
    const args = Array.from(arguments);
    const extract = field => item => `${item}: ${args[0][field][item]}`;
    console.log(
      `Name: ${propertyKey}
query: ${query.map(extract("query"))},
body: ${body.map(extract("body"))},
params:  ${params.map(extract("params"))}`
    );
    return originalMethod.apply(this, args);
  };

  return descriptor;
};
