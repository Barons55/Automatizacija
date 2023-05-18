class CheckOutStepOnePage {
    static get nameField(){
        return cy.get('[data-test="firstName"]');
    }

    static get lastnameField(){
        return cy.get('[data-test="lastName"]');
    }
    static get zipField(){
        return cy.get('[data-test="postalCode"]');
    }
    static get ClickContinue() {
        return cy.get('[data-test="continue"]');
    }
}
export default CheckOutStepOnePage;