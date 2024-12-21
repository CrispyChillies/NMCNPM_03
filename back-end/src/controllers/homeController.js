let getHomePage = (req, res) => {
    return res.render('homepage.ejs');
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getSignUpPage = (req, res) => {
    return res.render('signup.ejs');
}

let getSignInPage = (req, res) => {
    return res.render('signin.ejs'); // Added sign-in page
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getSignUpPage: getSignUpPage,
    getSignInPage: getSignInPage // Exported sign-in page
}