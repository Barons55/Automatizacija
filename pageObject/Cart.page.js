class CartPage {
    static get itemName(){
        return cy.get(".inventory_item_name");
    }
    static get cartBadgeIcon() {
        return cy.get(".shopping_cart_badge");
    }
    static get ClickCheckOut() {
        return cy.get('[data-test="checkout"]');
    }
}
export default CartPage;