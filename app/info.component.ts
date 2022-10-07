import { Component } from "@angular/core";

@Component({
    selector: 'app-info',
    template: `<h2>You can browse any particular page of Rebrickable database or search models by id of theme or keyword. Use "Only LS" checkbox to filter out most things like technic, fabuland, super-bat-aven-something and other. Random feature returns only models with picture. Collection (marked with a star) and wishlist (heart) exist on your machine locally. Store your favorite models and create amazing collection! How many models from your childhood will you find?</h2>
    <h3>Created by: <img style="width: 20px;" src="./assets/GitHub-Mark-32px.png" alt=""><a href="https://github.com/Pdzoc">PDzoc</a></h3>`,
    styles: ["h2 {text-align:center}"]
})

export class InfoComponent {

}