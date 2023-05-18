class LoginPage{
    static get url(){
        return "/";
    }

    static visit(){
        cy.visit(this.url);
    }

    static get usernameField(){
        return cy.get('[data-test="username"]');
    }

    static get passwordField(){
        return cy.get('[data-test="password"]');
    }

    static get loginButton(){
        return cy.get('[data-test="login-button"]');
    }

    static get errorMessage(){
        return cy.get('[data-test="error"]');
    }

    static logIntoPage(username, password){
        this.usernameField.type(username);
        this.passwordField.type(password);
        this.loginButton.click();
    }
}

export default LoginPage;