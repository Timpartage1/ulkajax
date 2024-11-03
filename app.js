
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./helpers.js/db.js');
const Submission = require('./models/Submission');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch((error) => console.error('Error synchronizing database:', error));


app.get('/', (req, res) => {
    res.render('form');
});


app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const submission = await Submission.create({ name, email, message });
        res.json({ success: true, id: submission.id });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to save submission' });
    }
});


app.get('/get-submissions', async (req, res) => {
    try {
        const submissions = await Submission.findAll({ order: [['createdAt', 'DESC']] });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve submissions' });
    }
});

app.delete('/delete-submission/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Submission.destroy({ where: { id } });
        res.json({ success: true, message: 'Submission deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete submission' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
