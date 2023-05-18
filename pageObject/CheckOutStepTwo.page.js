class CheckOutStepTwoPage {
    static get checkoutTotal(){
        return cy.get('.summary_total_label');
    }
    static get ClickFinish() {
        return cy.get('[data-test="finish"]');
    }
}
export default CheckOutStepTwoPage;