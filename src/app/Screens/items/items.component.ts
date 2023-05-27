import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {ItemDto, ItemService, PaginatedItems} from '../services/item.service';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements AfterViewInit {
    displayedColumns: string[] = ['position', 'name', 'price', 'quantity', 'description', 'type', 'condition'];
    dataSource: MatTableDataSource<ItemDto> = new MatTableDataSource<ItemDto>(); // Initiate the dataSource
    @ViewChild(MatSort) sort: MatSort | undefined;

    searchQuery: string = '';
    pageSize: number = 5;
    pageIndex: number = 0;
    workspaceId: any; // You may want to fetch this value dynamically

    totalItems: number = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    currentPageSize: number = 5;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private itemService: ItemService,
        private route: ActivatedRoute,
        private router:Router
    ) {
        // Inject the service
    }
    goToAddItem(workspaceId: string) {
        this.router.navigate(['/add-item', workspaceId]);
    }
    ngOnInit() {
        this.workspaceId = this.route.snapshot.paramMap.get('id') || '';
    }

    ngAfterViewInit() {
        this.fetchItems();
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }
    fetchItems(page: number = 1, pageSize: number = this.currentPageSize) {
        this.itemService
            .getPaginatedItems(this.workspaceId, page, pageSize)
            .subscribe((paginatedItems: PaginatedItems<ItemDto>) => {
                this.dataSource.data = paginatedItems.items;
                this.totalItems = paginatedItems.totalItems;
            });
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

    onPageChanged(event: PageEvent) {
        const pageIndex = event.pageIndex;
        const pageSize = event.pageSize;
        this.fetchItems(pageIndex + 1, pageSize);
    }
}
