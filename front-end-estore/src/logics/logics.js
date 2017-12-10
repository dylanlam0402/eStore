import baseLogic from './baseLogic';
import loginLogic from './loginLogic';
import orderLogic from './orderLogic'

export default [
    ...baseLogic,
    ...loginLogic,
    ...orderLogic
]