import { Injectable } from '@nestjs/common';
import { JwtCreds } from './auth.service';
import { v4 as uuidv4 } from 'uuid';
import { Maybe, maybeof } from '@/lib/fp/Maybe';

@Injectable()
export default class SessionService {
  private readonly sessions: { [id: string]: { creds: JwtCreds } } = {};
  private async generateId(): Promise<string> {
    const keys = Object.keys(this.sessions);
    let key = uuidv4();
    while (key in keys) {
      key = uuidv4();
    }
    return key;
  }
  public async createSession(creds: JwtCreds): Promise<string> {
    const keys = Object.keys(this.sessions);
    const key = await this.generateId();
    const existing = keys.filter(
      (key) => this.sessions[key].creds.email === creds.email
    );
    existing.forEach((key) => delete this.sessions[key]);
    this.sessions[key] = { creds };
    return key;
  }

  public async getCreds(sessionId: string): Promise<Maybe<[string, JwtCreds]>> {
    return maybeof(this.sessions[sessionId]).mapPromise(async (v) => {
      const newId = await this.generateId();
      this.sessions[newId] = v;
      delete this.sessions[sessionId];
      return [newId, v.creds];
    });
  }
}
