import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {PaginatedUsers, UserDto, UserRole, UserService} from 'src/app/Auth/services/user.service';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
    users!: PaginatedUsers<UserDto>;
    searchQuery = '';
    filteredUsers: UserDto[] = [];
    isLoading = true;
    totalPages: any;
    pageSizeOptions: number[] = [3, 5, 10, 25, 100];
    currentPageSize: number = 3;

    constructor(private route: ActivatedRoute, private userService: UserService, private router: Router,private toastr: ToastrService   ) {}

    ngOnInit() {
        this.getUsers();
    }
    getUsers(page: number = 1, pageSize: number = this.currentPageSize, filterUserRole: UserRole = UserRole.IT) {
        this.userService.getUsers(page, pageSize, filterUserRole).subscribe({
            next: (response) => {
                this.users = response;
    
                // Filter out the current user
                const currentUserId = localStorage.getItem('id');
                this.filteredUsers = response.users.filter(user => user.id !== Number(currentUserId));
    
                this.isLoading = false;
                this.totalPages = Math.ceil(response.totalUsers / response.pageSize);
            },
            error: (error) => {
                console.error('Failed to fetch users:', error);
                this.isLoading = false;
            },
        });
    }

    getPaginationArray(): number[] {
        return Array(this.totalPages)
            .fill(0)
            .map((_, index) => index + 1);
    }

    applyFilter() {
        this.filteredUsers = this.users.users.filter((user) =>
            user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    onPageChange(event: PageEvent) {
        this.currentPageSize = event.pageSize;
        this.getUsers(event.pageIndex + 1, event.pageSize);
    }

    onPageSizeChange(event: any) {
        this.currentPageSize = Number(event);
        this.isLoading = true;
        this.getUsers(1);
    }

    onSubmit() {
        this.router.navigate(['register']);
    }

    resetFilter() {
        this.searchQuery = '';
        this.applyFilter();
    }

    deleteUser(userId: number) {
        this.userService.deleteUser(userId).subscribe({
            next: (response) => {
                console.log(response);
                this.toastr.success('Fshirja me sukses!');

                // Successful deletion, now fetch updated user list
                this.getUsers();
            },
            error: (error) => {
                this.toastr.error('Fshirja pa sukses!');
                
            },
        });
    }
}
