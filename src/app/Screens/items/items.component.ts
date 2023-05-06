import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    type: string;
    condition: string;
}

const ELEMENT_DATA: Item[] = [
    {
        id: 1,
        name: 'Pencil',
        price: 0.99,
        quantity: 100,
        description: 'A basic writing instrument',
        type: 'Stationery',
        condition: 'New',
    },
    {
        id: 2,
        name: 'PC',
        price: 999.99,
        quantity: 10,
        description: 'A personal computer',
        type: 'Electronics',
        condition: 'Used',
    },
    {
        id: 3,
        name: 'Table',
        price: 49.99,
        quantity: 20,
        description: 'A sturdy table for multiple purposes',
        type: 'Furniture',
        condition: 'New',
    },
    {
        id: 4,
        name: 'Chairs',
        price: 29.99,
        quantity: 50,
        description: 'Comfortable chairs for seating',
        type: 'Furniture',
        condition: 'New',
    },
    {
        id: 5,
        name: 'Book',
        price: 9.99,
        quantity: 30,
        description: 'An interesting book to read',
        type: 'Stationery',
        condition: 'New',
    },
    {
        id: 6,
        name: 'Headphones',
        price: 49.99,
        quantity: 15,
        description: 'High-quality headphones for immersive audio experience',
        type: 'Electronics',
        condition: 'New',
    },
    {
        id: 7,
        name: 'Desk',
        price: 149.99,
        quantity: 5,
        description: 'A spacious desk for work or study',
        type: 'Furniture',
        condition: 'New',
    },
    {
        id: 8,
        name: 'Lamp',
        price: 19.99,
        quantity: 25,
        description: 'A stylish lamp for ambient lighting',
        type: 'Home Decor',
        condition: 'New',
    },
];

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements AfterViewInit {
    displayedColumns: string[] = ['position', 'name', 'price', 'quantity', 'description', 'type', 'condition'];
    dataSource: MatTableDataSource<Item>;

    @ViewChild(MatSort) sort: MatSort | undefined;
    searchQuery: string = '';
    pageSize: number = 5;
    pageIndex: number = 0;

    constructor(private _liveAnnouncer: LiveAnnouncer) {
        this.dataSource = new MatTableDataSource<Item>(ELEMENT_DATA);
    }

    ngAfterViewInit() {
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    applyFilter() {
        const filterValue = this.searchQuery.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }

    resetFilter() {
        this.searchQuery = '';
        this.applyFilter();
    }

    onPageChanged(event: any) {
        this.pageIndex = event.pageIndex;
    }
}
