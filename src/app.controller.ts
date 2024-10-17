import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { newRegisterDto } from './newRegister.dto';
import e, { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('register')
  @Render('register')
  getRegister() {
    return {
      errors: [],
      newData: {}
    };
  }

  @Post('register')
  registerReservation(
    @Body() newRegisterDto: newRegisterDto,
    @Res() response: Response) {



    let newData = {
      name: newRegisterDto.name,
      email: newRegisterDto.email,
      date: newRegisterDto.date,
      time: newRegisterDto.time,
      people: newRegisterDto.people
    }
    console.log(newData);


    let errors: string[] = [];
    //name error 
    if (newData.name == '') {
      errors.push('Name is required')
    }

    //email errors
    if (newData.email == '') {
      errors.push('Email is required')
    }
    else if (!/^[^@]+@[^@]+$/.test(newData.email)) {
      errors.push('Email is invalid')
    }

    //date errors
    if (newData.date == '') {
      errors.push('Date is required')
    }
    else if (new Date(newData.date) < new Date()) {
      errors.push('Date is invalid')
    }


    //time errors
    if (newData.time == '') {
      errors.push('Time is required')
    }

    //people errors :(
    if(newData.people < 1) {
      errors.push('Number of people must be at least 1')
    }
    if (newData.people > 10) {
      errors.push('Number of people must be at most 10')
    }


    if (errors.length > 0) {
      response.render('register', {
        errors: errors,
        newData: newData
      })
    }

    response.redirect('/success')
  }


  @Get('success')
  @Render('success')
  getSuccess() {
  }
}
