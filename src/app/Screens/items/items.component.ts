import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {ItemDto, ItemService, PaginatedItems, UserType} from '../services/item.service';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRole} from 'src/app/Auth/services/user.service';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements AfterViewInit {
    displayedColumns: string[] = ['position', 'name', 'price', 'quantity', 'description', 'type', 'condition', 'edit'];

    dataSource: MatTableDataSource<ItemDto> = new MatTableDataSource<ItemDto>(); // Initiate the dataSource
    @ViewChild(MatSort) sort: MatSort | undefined;

    searchQuery: string = '';
    pageSize: number = 5;
    pageIndex: number = 0;
    workspaceId: any; // You may want to fetch this value dynamically
    currentUserRole: string | null = null; // Stores the current user role
    totalItems: number = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    currentPageSize: number = 5;
    userRoles = Object.keys(UserRole).filter((key) => isNaN(Number(key)));

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private itemService: ItemService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        // Inject the service
    }
    goToAddItem(workspaceId: string) {
        this.router.navigate(['/edit-item', workspaceId, 0]);
    }
    ngOnInit() {
        this.workspaceId = this.route.snapshot.paramMap.get('id') || '';
        this.currentUserRole = localStorage.getItem('role'); // Get the user's role from local storage
    }

    ngAfterViewInit() {
        this.fetchItems();
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    goToEditItem(itemId: number) {
        console.log(itemId);

        this.router.navigate(['/edit-item', this.workspaceId, itemId]);
    }

    fetchItems(page: number = 1, pageSize: number = this.currentPageSize) {
        let filterUserType: UserType | undefined = undefined;

        // Set filterUserType based on the user's role
        if (this.currentUserRole === 'HR') {
            // If the role is 'HR', don't filter by user type
            filterUserType = undefined;
        } else if (this.currentUserRole && this.userRoles.includes(this.currentUserRole)) {
            filterUserType = this.currentUserRole as UserType;
        }

        this.itemService
            .getPaginatedItems(this.workspaceId, page, pageSize, filterUserType)
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
