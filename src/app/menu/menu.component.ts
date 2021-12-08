import { Component, Input, ViewChild } from "@angular/core";
import { MatMenu } from "@angular/material/menu";
import { DynamicDatabase } from "../dynamic-database.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
})
export class MenuComponent {
  @Input() data: string[] = [];
  @Input() trigger = "Trigger";
  @Input() isRootNode = false;

  @ViewChild("menu") public matMenu!: MatMenu;

  isLoading = false;
  dataLoaded = false;
  keepMenuOpen = false;

  constructor(private database: DynamicDatabase) {}

  getData(node: string) {
    if (!this.dataLoaded) {
      this.isLoading = true;
      this.database.getChildren(node).subscribe((d) => {
        this.data = d?.slice() || [];
        this.isLoading = false;
        this.dataLoaded = true;
      });
    }
  }

  isExpandable(node: string) {
    return this.database.isExpandable(node);
  }
}
