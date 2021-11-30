import { Sequelize } from 'sequelize/dist';
import db from '../models';

export const initDb = async () => {
    try{
        console.log('Connecting to database!');
      
        await db.sequelize.authenticate();
        console.log('\n ----> Connection to database has been established successfully! \n');
      
        await db.sequelize.sync();
        console.log('\n ----> Database tables synced. \n');

        return true;
      
      }catch (error){
        console.error('\n ----> Database error:', error);
        return false;
    }
}

export const cleanDbTable = async (table:any) => {

  await table.destroy({ truncate: true });

}