const sequelize = require('../models/expense');

const getexpense = async (req, res) => {
  try {
    const expense = await sequelize.findAll();
    console.log(expense);
    // res.json(userdata);
    res.render('index', { expense }); // Render the 'index.ejs' view with the data
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching expenses');
  }
}

const getbyidexpense = async (req, res) => {
  try {
    const id = req.params.id;
    const existingExpense = await sequelize.findOne({
      where: { id: id }
    });

    // If no expense is found with the given ID, return a 404 response
    if (!existingExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Create an object containing the updated data
    const expense1 = {
      id: existingExpense.dataValues.id,
      amount: existingExpense.dataValues.amount,
      expensename: existingExpense.dataValues.expensename,
      expensetype: existingExpense.dataValues.expensetype
    };

    res.render('edit', { expense1 });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching expenses');
  }
}

const postexpense = async (req, res) => {
  console.log("hello");
  const amount = req.body.amount;
  const expensename = req.body.expensename;
  const expensetype = req.body.expensetype;
  console.log(`Amount: ${amount}, Expense Name: ${expensename}, Expense Type: ${expensetype}`);

  try {
    const user = await sequelize.create({
      amount: amount,
      expensename: expensename,
      expensetype: expensetype
    });

    console.log("hi");
    // res.status(201).json(user);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating the expense');
  }
}


const dltexpense = async (req, res) => {
  try {
    const id = req.params.id;
    await sequelize.destroy({ where: { id: id } });
    res.redirect('/');
    // res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting the expense');
  }
}

const updateexpense = async (req, res) => {
  try {
    // Extract the expense ID from the request parameters
    const id = req.params.id;

    // Extract the updated data (amount, expensename, expensetype) from the request body
    // const { amount, expensename, expensetype } = req.body;

    const existingExpense = await sequelize.findOne({
      where: { id: id }
    });

    if (!existingExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const expense1 = {
      amount: req.query.amount,
      expensename: req.query.expensename,
      expensetype: req.query.expensetype
    };

    await sequelize.update(expense1, {
      where: { id: id }
    });

    // res.json({ message: 'Expense updated successfully' });
    res.redirect('/');
  } catch (error) {
    // If there is an error during the update process, handle it and send a 500 (Internal Server Error) response
    console.log(error);
    res.status(500).send('Error updating the expense');
  }
};


module.exports = { getexpense, getbyidexpense, postexpense, dltexpense, updateexpense };