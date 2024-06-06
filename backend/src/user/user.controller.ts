import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()

  findAll(){
    return this.userService.findAll()
  }

  @Get(":id")
  findById(@Param("id") clerkId:string){
    return this.userService.findById(clerkId)
  }
}
