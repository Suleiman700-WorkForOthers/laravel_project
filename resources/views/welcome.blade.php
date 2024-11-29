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
    <!-- Date Range Picker -->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <style>
        .search-filters {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            /* box-shadow: 0 2px 4px rgba(0,0,0,0.1); */
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
        <div class="col text-center">
            <h1 class="page-title">
                <i class="fas fa-phone me-2"></i>
                Calls List
            </h1>
        </div>
    </div>

    <!-- Search Filters -->
    <div class="search-filters" id="section_filters">
        <div>
            <div class="row g-3">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="select-agent" class="form-label">Agent</label>
                        <select class="form-select" id="select-agent">
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="select-customers" class="form-label">Customer</label>
                        <select class="form-select" id="select-customers">
                        </select>
                    </div>
                </div>
                <!-- <div class="col-md-3">
                    <div class="form-group">
                        <label for="date1" class="form-label">Date</label>
                        <input type="date" class="form-control" id="date1">
                    </div>
                </div> -->
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="date-range" class="form-label">Date</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="date-range">
                            <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <button type="submit" class="btn btn-primary" id="filter-submit">
                        <i class="fas fa-search me-1"></i> Search
                    </button>
                    <button type="reset" class="btn btn-secondary ms-2" id="filter-reset" style="display: none;">
                        <i class="fas fa-undo me-1"></i> Reset
                    </button>
                </div>
            </div>
            </form>
        </div>

        <!-- Table -->
        <div class="table-container mt-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <!-- <h3 class="mb-0">Calls</h3> -->
            </div>
            <div class="table-responsive">
                <table class="table table-hover" id="test-table">
                    <thead class="table-light">
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>


        <!-- Table -->
        <div class="table-container" hidden>
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

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Moment.js -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <!-- Date Range Picker -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
</body>
</html>
