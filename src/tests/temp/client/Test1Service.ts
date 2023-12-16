
  export interface Test1CreateOneInput {
  text: string;
}

export interface Test1 {
  id: string;
  createdAt: number;
  updatedAt: number;
  text: string;
  isPublic: boolean;
}
  import { postToUnary } from './utils';
  import { Metadata } from 'nice-grpc';
 
  export class Test1Service {
    private readonly serviceName: string = "Test1Service";
    
    constructor(private opts?: {port?: string, host?: string}){}
    
    
    async createOne(data: Partial<Test1CreateOneInput>, metadata: Metadata=new Metadata()): Promise<Test1> {
      return postToUnary<Test1>(this.serviceName, 'createOne', data, metadata, this.opts);
    }
  
  }
