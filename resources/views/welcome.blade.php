<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel Dynamic</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .search-filters {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .table-container {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .page-title {
            color: #2d3748;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
        }
    </style>
</head>
<body class="bg-light">
<div class="container py-5">
    <!-- Page Title -->
    <div class="row mb-4">
        <div class="col">
            <h1 class="page-title">
                <i class="fas fa-database me-2"></i>
                Data Management System
            </h1>
        </div>
    </div>

    <!-- Search Filters -->
    <div class="search-filters" id="section_filters">
        <div>
            <div class="row g-3">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="search" class="form-label">Search</label>
                        <input type="text" class="form-control" id="search" placeholder="Search...">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="status" class="form-label">Status</label>
                        <select class="form-select" id="status">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="date" class="form-label">Date Range</label>
                        <input type="date" class="form-control" id="date">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="category" class="form-label">Category</label>
                        <select class="form-select" id="category">
                            <option value="">All Categories</option>
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-search me-1"></i> Search
                    </button>
                    <button type="reset" class="btn btn-secondary ms-2">
                        <i class="fas fa-undo me-1"></i> Reset
                    </button>
                </div>
            </div>
            </form>
        </div>

        <!-- Table -->
        <div class="table-container">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3 class="mb-0">Results</h3>
                <button class="btn btn-success">
                    <i class="fas fa-plus me-1"></i> Add New
                </button>
            </div>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead class="table-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    @for ($i = 1; $i <= 5; $i++)
                        <tr>
                            <th scope="row">{{ $i }}</th>
                            <td>User {{ $i }}</td>
                            <td>user{{ $i }}@example.com</td>
                            <td>
                                <span class="badge bg-{{ $i % 2 == 0 ? 'success' : 'warning' }}">
                                    {{ $i % 2 == 0 ? 'Active' : 'Pending' }}
                                </span>
                            </td>
                            <td>2023-{{ str_pad($i, 2, '0', STR_PAD_LEFT) }}-01</td>
                            <td>Category {{ $i }}</td>
                            <td>
                                <button class="btn btn-sm btn-info me-1" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-sm btn-primary me-1" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    @endfor
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <nav aria-label="Page navigation" class="mt-4">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('js/plugins/sweetalert/sweetalert2@11.js') }}"></script>
    <script src="{{ asset('js/views/welcome/init.js') }}" type="module"></script>
</body>
</html>
