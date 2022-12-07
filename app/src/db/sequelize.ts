import db from '../models';

const sequealize = () => {
  try {
    db.sequelize.sync({ force: false });
  } catch (error) {
    console.log(error);
  }
}

export default sequealize
