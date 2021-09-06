import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData.paymentDetailId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => { 
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully', 'Euromonitor Payment');
       },
       err => { console.log("Error message : " + err); }
    );
  }

  updateRecord(form:NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => { 
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'Euromonitor Payment');
       },
       err => { console.log("Error message : " + err); }
    );
  }

  resetForm(form:NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

}
