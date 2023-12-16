import { combineProtos } from '../combine-protos';

describe('combine-protos', () => {
  test('basic', async () => {
    const combined = combineProtos([`${__dirname}/protos`], []);
    expect(combined).toMatchInlineSnapshot(`
      "syntax = "proto3";

      package main;

      message Test1 {
        string id = 1;
        uint64 createdAt = 2;
        uint64 updatedAt = 3;
        string text = 4;
        bool isPublic = 5;
      }

      message Test1CreateOneInput {
        string text = 2;
      }

      message Test2 {
        string id = 1;
        uint64 createdAt = 2;
        uint64 updatedAt = 3;
        string text = 4;
        bool isPublic = 5;
      }

      message Test2CreateOneInput {
        string text = 2;
      }

      service Test1Service {
        rpc CreateOne (Test1CreateOneInput) returns (Test1) {}
      }

      service Test2Service {
        rpc CreateOne (Test2CreateOneInput) returns (Test2) {}
      }

      "
    `);
  });
});