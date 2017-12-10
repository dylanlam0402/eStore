import UserService from './UserService';

import ItemTypeService from './ItemTypeService'
import ItemService from './ItemService'
import CustomerService from './CustomerService'
import OrderService from './OrderService'

const userService = new  UserService();
const itemService = new ItemService();
const customerService = new CustomerService();
const orderService = new OrderService();
const itemTypeService = new ItemTypeService();


export {
    userService,itemTypeService, itemService, customerService,orderService
};