
# 🐇 Chase the Rabbit 🐉

Welcome to Chase the Rabbit, a fun and engaging game inspired by classic snake mechanics **(desktop only)**. This project was built by two students from Chas Academy while learning React and Next.js. The game challenges players to collect points, purchase characters, and track their high scores.

## Features

- **Point System** – Earn points by catching the rabbit. Each time the dragon collides with the rabbit, the score increases by 1 in a state variable. 

- **High Score Tracking** – Your best score is saved locally using localStorage. If you collide with the game’s boundary or obstacles, and your score is higher than your previous high score, it will be saved.

- **Coin System** – Collect coins by catching the rabbit and use them to purchase characters. Coins are earned 1:1 with points, and they are stored in the context so you can use them on the character page to buy new characters.

- **Character Selection** – Choose one free character and two additional characters you can buy. You can buy characters with coins.

- **Instruction Popup** – A helpful guide on the front page to get you started.

## Technologies Used

- **Next.js** – A React framework.

- **React Context API** – For global state management.

- **Tailwind CSS** – For styling.
  
## Currently deployed
- **Live at Vercel:** <a href="https://chase-the-rabbit-yvfw.vercel.app/" target="_blank">Live</a>

  
## Contributors
- [Joel](https://github.com/Joel050505)
- [Daniel](https://github.com/Dantilldev)
