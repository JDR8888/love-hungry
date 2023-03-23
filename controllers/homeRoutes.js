const router = require("express").Router();
const { User, Restaurant, Date } = require("../models");

router.get("/", async (req, res) => {
  res.render("homepage", {
    title: "Homepage",
    logged_in: req.session.logged_in,
  });
});

router.get("/login", async (req, res) => {
  res.render("login", {
    title: "login",
  });
});

router.get("/dating", async (req, res) => {
  res.render("dating"),
    {
      title: "dating",
    };
});

router.get("/dating", async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        what_to_eat: req.session.user.what_to_eat,
        location: req.session.user.location,
        id: { [Op.ne]: req.session.user.id },
      },
    });
    const restaurantData = await Restaurant.findAll({
      where: {
        cuisine_description: req.session.user.what_to_eat,
        boro: req.session.user.location,
      },
    });

    const displayDates = userData.map((users) => users.get({ plain: true }));
    const displayRestaurants = restaurantData.map((restaurants) =>
      restaurants.get({ plain: true })
    );

    res.render("/dating", {
      title: "Dating",
      displayDates,
      displayRestaurants,
      loggedIn: req.session.loggedIn,
      name: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  res.render("signup", {
    title: "signup",
  });
});

module.exports = router;

// when you query for a user's dates
/*
const dates1 = await Date.findAll({
    where: {
        user1: req.session.user_id,
    }
});

const dates2 = await Date.findAll({
    where: {
        user2: req.session.user_id
    }
})

const dates = [...dates1, ...dates2]

const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [...a, ...b] // [1, 2, 3, 4, 5, 6]
const d = [...a, b] // [1, 2, 3, [4, 5, 6]]

const e = { color: 'blue', length: 12 }
const f = { size: 'large' }
const g = { ...e, ...f } // 
*/
