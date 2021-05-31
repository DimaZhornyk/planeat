import { Controller, Get, Res } from "@nestjs/common";
import { Response, response } from "express";
import { PUBLIC_RSA } from "./auth.constants";

@Controller('auth')
export class AuthController {
  @Get('/public_key') 
  public async getPublicKey(@Res({passthrough:true}) response:Response){
    response.end(PUBLIC_RSA)
  }
}