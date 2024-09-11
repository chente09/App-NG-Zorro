import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RegistersService, Register } from '../../services/registers/registers.service';
import { EmailService } from '../../services/email/email.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NzTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  registers: Register[] = [];
  constructor(private registersService: RegistersService, private emailService: EmailService) {}

  ngOnInit(): void {  
    this.getRegisters();
  }

  getRegisters(): void{
    this.registersService.getRegisters().subscribe(rs=>this.registers=rs);
  }

  sendEmail(register: Register): void {
    this.emailService.sendEmail(
      register.email,
      register.nickname,
      `<h1>Hola ${register.nickname} Gracias por registrarte en nuestra tienda</h1>`,
      'Gracias por registrarte en nuestra tienda'
    ).subscribe(response => console.log(response));
  }
}
