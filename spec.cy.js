import HomePage from "../../pageObject/Home.page";
import LoginPage from "../../pageObject/Login.page";
import CartPage from "../../pageObject/Cart.page";
import CheckOutStepOnePage from "../../pageObject/CheckOutStepOne.page";
import CheckOutStepTwoPage from "../../pageObject/CheckOutStepTwo.page";
import CheckOutCompletePage from "../../pageObject/CheckOutComplete.page";

describe("Saucedemo", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });
  it("1. Scenario 1", () => {
    LoginPage.usernameField.type("standard_user");
    LoginPage.passwordField.type("secret_sauce");
    LoginPage.loginButton.should("be.visible");
    LoginPage.loginButton.click();
    LoginPage.loginButton.should("not.exist");
  });
  it("2. Login scenario - Negative case", () => {
    LoginPage.usernameField.type("standard_user");
    LoginPage.passwordField.type("secret_sauce");
    LoginPage.loginButton.click();
    LoginPage.loginButton.should("have.text", "Epic sadface: Username and password do not match any user in this service");
  });
  it("3.Login  Scenario", () => {
    // Log into App
    LoginPage.usernameField.type("standard_user");
    LoginPage.passwordField.type("secret_sauce");
    LoginPage.loginButton.click();
    // Click on Burger/Stack icon
    HomePage.sideBar.invoke("attr", "aria-hidden").should("eq", "true");
    HomePage.stackIcon.click();
    HomePage.sideBar.invoke("attr", "aria-hidden").should("eq", "false");
    // Click logout button
    HomePage.logoutButton.click();
    // Validate that we see login button
    LoginPage.loginButton.should("be.visible");
  });
  it("4.Add items to cart", () => {
    //
    LoginPage.usernameField.type("standard_user");
    LoginPage.passwordField.type("secret_sauce");
    LoginPage.loginButton.click();
    HomePage.addToCartSauceLabsBackpack.click();
    HomePage.addToCartSauceLabTShirt.click();
    HomePage.addToCartSauceLabOnesie.click();
    HomePage.cartBadgeIcon.scrollIntoView().should("have.text", "3");
  });

  it("5.Add and remove item", () => {
    LoginPage.logIntoPage("standard_user", "secret_sauce")
    //Click on sauce lab backpack
    HomePage.addToCartSauceLabsBackpack.click();
    // Validate that the badge is 1
    HomePage.cartBadgeIcon.scrollIntoView().should("have.text", "1");
    //remove the backpack
    HomePage.removeSauceLabsBackpack.click();
    //Validate that the badge should no longer exist
    HomePage.cartBadgeIcon.should("not.exist");
  });

  it("6. Open specific item, and validate title", () => {
    //log into page
    LoginPage.logIntoPage("standard_user", "secret_sauce");
    //click on backpack item
    HomePage.itemNames.contains("Backpack").click();
    //validate that the correct item is opened, title is correct
    HomePage.itemName.should("have.text", "Sauce Labs Backpack");
  });

  it.only("7. Buy Sauce Labs Backpack", () => {
    //log into page
    LoginPage.logIntoPage("standard_user", "secret_sauce");
    //add to cart "Sauce Labs Backpack"
    HomePage.addToCartSauceLabsBackpack.click();
    //add to cart "Sauce Labs Bolt T-Shirt"
    HomePage.addToCartSauceLabTShirt.click();
    //open cart create CartsPage object
    HomePage.cartBadgeIcon.click();
    //validate that we see "Sauce Labs Backpack" and "Sauce Labs Bolt T-Shirt"
    CartPage.itemName.should("have.text", "Sauce Labs BackpackSauce Labs Bolt T-Shirt");
    //validate that we see 2 items in cart list
    CartPage.cartBadgeIcon.should("have.text", "2");
    //click checkout (create new page object = CheckOutStepOne)
    CartPage.ClickCheckOut.click();
    //set firstname, lastname, zip code
    CheckOutStepOnePage.nameField.type("Karlis");
    CheckOutStepOnePage.lastnameField.type("Barons");
    CheckOutStepOnePage.zipField.type("LV-1024");
    //click continue
    CheckOutStepOnePage.ClickContinue.click();
    //(create step two page object) validate that we see "49.66"
    CheckOutStepTwoPage.checkoutTotal.should("have.text", "Total: $49.66")
    //click Finish
    CheckOutStepTwoPage.ClickFinish.click();
    //(create checkout complete page object) validate that we can see "Thank you for your order!"
    CheckOutCompletePage.checkoutFinishText.should("have.text", "Thank you for your order!")
    //
  });
});