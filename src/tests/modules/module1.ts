import { Module } from '@nestjs/common';
import { Module2 } from './module2';

const imports = [Module2];
export { imports };

@Module({ imports })
export class Module1 {}
