export default class Sidebar{
    elements = {
        item: () => cy.get('.oxd-main-menu-item')
    }
    visitPage = (page:string) =>{
        return this.elements.item().contains(page).click({force: true});
    }
}