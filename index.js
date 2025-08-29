const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Input must be a valid array.",
                user_id: "your_full_name_ddmmyyyy"
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets_for_output = [];
        const special_characters = [];
        let sum = 0;
        const all_alpha_chars_for_concat = [];

        data.forEach(item => {
            const trimmedItem = String(item).trim();
            if (trimmedItem === '') return;

            if (/^\d+$/.test(trimmedItem)) {
                const num = parseInt(trimmedItem);
                if (num % 2 === 0) {
                    even_numbers.push(trimmedItem);
                } else {
                    odd_numbers.push(trimmedItem);
                }
                sum += num;
            } else if (/^[a-zA-Z]+$/.test(trimmedItem)) {
                alphabets_for_output.push(trimmedItem.toUpperCase());
                for (const char of trimmedItem) {
                    all_alpha_chars_for_concat.push(char);
                }
            } else {
                special_characters.push(trimmedItem);
            }
        });

        const reversed_alpha_chars = all_alpha_chars_for_concat.reverse();

        let concat_string = '';
        for (let i = 0; i < reversed_alpha_chars.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alpha_chars[i].toUpperCase();
            } else {
                concat_string += reversed_alpha_chars[i].toLowerCase();
            }
        }

        const response = {
            is_success: true,
            user_id: "sreesritha_sai_31082005", 
            email: "sreesritha18@gmail.com", 
            roll_number: "22BCE8061", 
            odd_numbers,
            even_numbers,
            alphabets: alphabets_for_output,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            is_success: false,
            user_id: "your_full_name_ddmmyyyy",
            message: "An internal server error occurred."
        });
    }
});

app.get('/', (req, res) => {
    res.status(200).send('API is running. Use POST to the /bfhl route.');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});