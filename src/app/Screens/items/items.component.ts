import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {ItemDto, ItemService, PaginatedItems, UserType} from '../services/item.service';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRole} from 'src/app/Auth/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {DialogItemComponent} from 'src/app/components/dialog-item/dialog-item.component';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements AfterViewInit {
    displayedColumns: string[] = [
        'position',
        'name',
        'price',
        'quantity',
        'description',
        'condition',
        'edit',
        'delete',
    ];

    dataSource: MatTableDataSource<ItemDto> = new MatTableDataSource<ItemDto>();
    @ViewChild(MatSort) sort: MatSort | undefined;
    isLoading = true;
    searchQuery: string = '';
    pageSize: number = 5;
    pageIndex: number = 0;
    workspaceId: any;
    currentUserRole: string | null = null;
    totalItems: number = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    currentPageSize: number = 5;
    userRoles = Object.keys(UserRole).filter((key) => isNaN(Number(key)));
    private deleteSubscription: Subscription | undefined;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private itemService: ItemService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private location: Location,
        private dialog: MatDialog
    ) {}

    goToAddItem(workspaceId: string) {
        this.router.navigate(['/edit-item', workspaceId, 0]);
    }

    ngOnInit() {
        this.workspaceId = this.route.snapshot.paramMap.get('id') || '';
        this.currentUserRole = localStorage.getItem('role');
        this.isLoading = false;
    }

    ngAfterViewInit() {
        this.fetchItems();
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    goback() {
        this.location.back();
    }
    goToEditItem(itemId: number) {
        console.log(itemId);
        this.router.navigate(['/edit-item', this.workspaceId, itemId]);
    }

    fetchItems(page: number = 1, pageSize: number = this.currentPageSize) {
        let filterUserType: UserType | undefined = undefined;

        if (this.currentUserRole === 'HR') {
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

    exportItems() {
        let filterUserType: UserType | undefined = undefined;

        if (this.currentUserRole === 'HR') {
            filterUserType = undefined;
        } else if (this.currentUserRole && this.userRoles.includes(this.currentUserRole)) {
            filterUserType = this.currentUserRole as UserType;
        }

        this.itemService.exportItems(this.workspaceId, filterUserType).subscribe({
            next: (data: Blob) => {
                const blob = new Blob([data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Items.xlsx';
                link.click();
                this.toastr.success('Shkarkimi me sukses!');
            },
            error: (error: any) => {
                // Handle error
                this.toastr.error('Shkarkimi nuk u krye!');
            },
        });
    }

    onDelete(id: number) {
        const dialogRef = this.dialog.open(DialogItemComponent, {
            data: {
                title: 'Fshirja e Objektit',
                message: 'A jeni i sigurtë që doni të fshini këtë objekt?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteSubscription = this.itemService.deleteItem(id).subscribe({
                    next: () => {
                        this.toastr.success('Item deleted successfully.');
                        this.fetchItems(this.pageIndex + 1, this.pageSize); // Fetch data again after successful deletion
                        this.router.navigate(['/items', this.workspaceId]);
                    },
                    error: (error) => {
                        this.toastr.error('Failed to delete item.');
                        console.error('Failed to delete item:', error);
                    },
                });
            }
        });
    }

    ngOnDestroy() {
        if (this.deleteSubscription) {
            this.deleteSubscription.unsubscribe();
        }
    }
}
