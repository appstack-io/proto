
  export interface Test2CreateOneInput {
  text: string;
}

export interface Test2 {
  id: string;
  createdAt: number;
  updatedAt: number;
  text: string;
  isPublic: boolean;
}
  import { postToUnary } from './utils';
  import { Metadata } from 'nice-grpc';
 
  export class Test2Service {
    private readonly serviceName: string = "Test2Service";
    
    constructor(private opts?: {port?: string, host?: string}){}
    
    
    async createOne(data: Partial<Test2CreateOneInput>, metadata: Metadata=new Metadata()): Promise<Test2> {
      return postToUnary<Test2>(this.serviceName, 'createOne', data, metadata, this.opts);
    }
  
  }
