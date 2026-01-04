const URL_RESEP = 'https://recipes.otwdochub.my.id/recipes';
const API_KEY_RESEP = 'belin123'; 

const URL_KALORI = 'https://cal.otwdochub.my.id/index.php/calculate';
const API_KEY_KALORI = 'nutriplate'; 

// data resep
async function loadRecipes() {
    try {
        const response = await fetch(URL_RESEP, {
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY_RESEP, 
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        document.getElementById('loading').style.display = 'none';
        const listContainer = document.getElementById('recipe-list');

        data.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-item'; // Class dasar
            card.innerHTML = `
                <strong>${recipe.recipe_name}</strong><br>
                <small>Bahan: ${recipe.matched_ingredients}</small>
            `;
            
            card.onclick = () => {
                document.querySelectorAll('.recipe-item').forEach(item => {
                    item.classList.remove('active');
                });

                card.classList.add('active');

                getNutritionData(recipe);
            };

            listContainer.appendChild(card);
        });
    } catch (error) {
        document.getElementById('loading').innerText = "Gagal memuat resep: " + error.message;
    }
}

async function getNutritionData(recipe) {
    const resultBox = document.getElementById('result');
    const totalCalElement = document.getElementById('total-cal');
    const breakdownList = document.getElementById('breakdown-list');

    resultBox.style.display = 'block';
    document.getElementById('res-title').innerText = recipe.recipe_name;
    document.getElementById('res-ingredients').innerText = "Bahan: " + recipe.matched_ingredients;
    totalCalElement.innerText = "...";
    breakdownList.innerHTML = "<li>Menganalisis data...</li>";

    const ingredientsArray = recipe.matched_ingredients.split(',').map(i => i.trim());

    try {
        const response = await fetch(URL_KALORI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY_KALORI 
            },
            body: JSON.stringify({ ingredients: ingredientsArray })
        });

        const data = await response.json();

        if (data.status === 'success' || data.total_calories !== undefined) {
            totalCalElement.innerText = data.total_calories;
            breakdownList.innerHTML = "";
            data.breakdown.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.food}</strong>: ${item.cal} kcal`;
                breakdownList.appendChild(li);
            });
        } else {
            throw new Error(data.messages?.error || "Gagal menghitung");
        }
    } catch (error) {
        totalCalElement.innerText = "Error";
        breakdownList.innerHTML = `<li style="color:red;">${error.message}</li>`;
    }
}

loadRecipes();