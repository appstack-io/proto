import { Module } from '@nestjs/common';

@Module({})
export class Module2 {
  static getDirname() {
    return `${__dirname}/../protos`;
  }
}
