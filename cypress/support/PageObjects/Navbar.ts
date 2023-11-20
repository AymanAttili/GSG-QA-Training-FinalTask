export default class Navbar{

    elements = {
        item: () => cy.get('.oxd-topbar-body-nav-tab')
    }

    clickBTN = (btn: string) => {
        return this.elements.item().contains(btn).click();
    }
}

