import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history.service';
import { OrderHistory } from '../../common/order-history';
import { getUser } from 'src/app/common/common';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  // array of OrderHistory items
  orderHistoryList: OrderHistory[] = [];
  
  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    getUser().then(user => {
      if (!user) {
        return;
      }
      this.orderHistoryService.getOrderHistory(user.email).subscribe(
        data => {
          this.orderHistoryList = data._embedded.orders;
        }
      );
    });
  }

}
