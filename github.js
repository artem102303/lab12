const btn = document.getElementById("searchBtn");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();

    if (!username) {
        result.innerHTML = `<p style="color:red;">Введіть нікнейм</p>`;
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (response.status === 404) {
            result.innerHTML = `<p style="color:red;">Користувача не знайдено</p>`;
            return;
        }

        const data = await response.json();

        result.innerHTML = `
            <img src="${data.avatar_url}" width="150">
            <p><b>Ім'я:</b> ${data.name || "Немає даних"}</p>
            <p><b>Репозиторії:</b> ${data.public_repos}</p>
            <p><b>Підписники:</b> ${data.followers}</p>
        `;
    } catch (error) {
        result.innerHTML = `<p style="color:red;">Помилка з'єднання</p>`;
    }
});