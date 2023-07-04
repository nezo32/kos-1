export type Departments = {
    date_created?: string | null;
    date_updated?: string | null;
    disciplines?: any[] | Disciplines[] | null;
    faculty?: string | Faculties | null;
    id: string;
    mines_id?: string | null;
    name?: string | null;
    plans?: any[] | Plans[] | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type DirectusActivity = {
    action: string;
    collection: string;
    comment?: string | null;
    id: number;
    ip?: string | null;
    item: string;
    origin?: string | null;
    revisions?: any[] | DirectusRevisions[] | null;
    timestamp: string;
    user?: string | DirectusUsers | null;
    user_agent?: string | null;
};

export type DirectusCollections = {
    accountability?: string | null;
    archive_app_filter: boolean;
    archive_field?: string | null;
    archive_value?: string | null;
    collapse: string;
    collection: string;
    color?: string | null;
    display_template?: string | null;
    group?: string | DirectusCollections | null;
    hidden: boolean;
    icon?: string | null;
    item_duplication_fields?: unknown | null;
    note?: string | null;
    preview_url?: string | null;
    singleton: boolean;
    sort?: number | null;
    sort_field?: string | null;
    translations?: unknown | null;
    unarchive_value?: string | null;
};

export type DirectusDashboards = {
    color?: string | null;
    date_created?: string | null;
    icon: string;
    id: string;
    name: string;
    note?: string | null;
    panels?: any[] | DirectusPanels[] | null;
    user_created?: string | DirectusUsers | null;
};

export type DirectusFields = {
    collection?: string | DirectusCollections | null;
    conditions?: unknown | null;
    display?: string | null;
    display_options?: unknown | null;
    field: string;
    group?: string | DirectusFields | null;
    hidden: boolean;
    id: number;
    interface?: string | null;
    note?: string | null;
    options?: unknown | null;
    readonly: boolean;
    required?: boolean | null;
    sort?: number | null;
    special?: unknown | null;
    translations?: unknown | null;
    validation?: unknown | null;
    validation_message?: string | null;
    width?: string | null;
};

export type DirectusFiles = {
    charset?: string | null;
    description?: string | null;
    duration?: number | null;
    embed?: string | null;
    filename_disk?: string | null;
    filename_download: string;
    filesize?: number | null;
    folder?: string | DirectusFolders | null;
    height?: number | null;
    id: string;
    location?: string | null;
    metadata?: unknown | null;
    modified_by?: string | DirectusUsers | null;
    modified_on: string;
    storage: string;
    tags?: unknown | null;
    title?: string | null;
    type?: string | null;
    uploaded_by?: string | DirectusUsers | null;
    uploaded_on: string;
    width?: number | null;
};

export type DirectusFlows = {
    accountability?: string | null;
    color?: string | null;
    date_created?: string | null;
    description?: string | null;
    icon?: string | null;
    id: string;
    name: string;
    operation?: string | DirectusOperations | null;
    operations?: any[] | DirectusOperations[] | null;
    options?: unknown | null;
    status: string;
    trigger?: string | null;
    user_created?: string | DirectusUsers | null;
};

export type DirectusFolders = {
    id: string;
    name: string;
    parent?: string | DirectusFolders | null;
};

export type DirectusMigrations = {
    name: string;
    timestamp?: string | null;
    version: string;
};

export type DirectusNotifications = {
    collection?: string | null;
    id: number;
    item?: string | null;
    message?: string | null;
    recipient?: string | DirectusUsers | null;
    sender?: string | DirectusUsers | null;
    status?: string | null;
    subject: string;
    timestamp?: string | null;
};

export type DirectusOperations = {
    date_created?: string | null;
    flow?: string | DirectusFlows | null;
    id: string;
    key: string;
    name?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    reject?: string | DirectusOperations | null;
    resolve?: string | DirectusOperations | null;
    type: string;
    user_created?: string | DirectusUsers | null;
};

export type DirectusPanels = {
    color?: string | null;
    dashboard?: string | DirectusDashboards | null;
    date_created?: string | null;
    height: number;
    icon?: string | null;
    id: string;
    name?: string | null;
    note?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    show_header: boolean;
    type: string;
    user_created?: string | DirectusUsers | null;
    width: number;
};

export type DirectusPermissions = {
    action: string;
    collection: string;
    fields?: unknown | null;
    id: number;
    permissions?: unknown | null;
    presets?: unknown | null;
    role?: string | DirectusRoles | null;
    validation?: unknown | null;
};

export type DirectusPresets = {
    bookmark?: string | null;
    collection?: string | null;
    color?: string | null;
    filter?: unknown | null;
    icon?: string | null;
    id: number;
    layout?: string | null;
    layout_options?: unknown | null;
    layout_query?: unknown | null;
    refresh_interval?: number | null;
    role?: string | DirectusRoles | null;
    search?: string | null;
    user?: string | DirectusUsers | null;
};

export type DirectusRelations = {
    id: number;
    junction_field?: string | null;
    many_collection: string;
    many_field: string;
    one_allowed_collections?: unknown | null;
    one_collection?: string | null;
    one_collection_field?: string | null;
    one_deselect_action: string;
    one_field?: string | null;
    sort_field?: string | null;
};

export type DirectusRevisions = {
    activity?: number | DirectusActivity | null;
    collection: string;
    data?: unknown | null;
    delta?: unknown | null;
    id: number;
    item: string;
    parent?: number | DirectusRevisions | null;
};

export type DirectusRoles = {
    admin_access: boolean;
    app_access: boolean;
    available_users?: any[] | JunctionDirectusUsersDirectusRoles[] | null;
    description?: string | null;
    enforce_tfa: boolean;
    icon: string;
    id: string;
    ip_access?: unknown | null;
    name: string;
    users?: any[] | DirectusUsers[] | null;
};

export type DirectusSessions = {
    expires: string;
    ip?: string | null;
    origin?: string | null;
    share?: string | DirectusShares | null;
    token: string;
    user?: string | DirectusUsers | null;
    user_agent?: string | null;
};

export type DirectusSettings = {
    auth_login_attempts?: number | null;
    auth_password_policy?: string | null;
    basemaps?: unknown | null;
    custom_aspect_ratios?: unknown | null;
    custom_css?: string | null;
    default_language: string;
    id: number;
    mapbox_key?: string | null;
    module_bar?: unknown | null;
    project_color?: string | null;
    project_descriptor?: string | null;
    project_logo?: string | DirectusFiles | null;
    project_name: string;
    project_url?: string | null;
    public_background?: string | DirectusFiles | null;
    public_foreground?: string | DirectusFiles | null;
    public_note?: string | null;
    storage_asset_presets?: unknown | null;
    storage_asset_transform?: string | null;
    storage_default_folder?: string | DirectusFolders | null;
};

export type DirectusShares = {
    collection?: string | DirectusCollections | null;
    date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
    id: string;
    item?: string | null;
    max_uses?: number | null;
    name?: string | null;
    password?: string | null;
    role?: string | DirectusRoles | null;
    times_used?: number | null;
    user_created?: string | DirectusUsers | null;
};

export type DirectusTranslations = {
    id: string;
    key: string;
    language: string;
    value: string;
};

export type DirectusUsers = {
    auth_data?: unknown | null;
    available_roles?: any[] | JunctionDirectusUsersDirectusRoles[] | null;
    avatar?: string | DirectusFiles | null;
    description?: string | null;
    email?: string | null;
    email_notifications?: boolean | null;
    external_identifier?: string | null;
    first_name?: string | null;
    id: string;
    language?: string | null;
    last_access?: string | null;
    last_name?: string | null;
    last_page?: string | null;
    location?: string | null;
    password?: string | null;
    provider: string;
    role?: string | DirectusRoles | null;
    status: string;
    tags?: unknown | null;
    tfa_secret?: string | null;
    theme?: string | null;
    title?: string | null;
    token?: string | null;
};

export type DirectusWebhooks = {
    actions: unknown;
    collections: unknown;
    data: boolean;
    headers?: unknown | null;
    id: number;
    method: string;
    name: string;
    status: string;
    url: string;
};

export type Disciplines = {
    children?: any[] | Disciplines[] | null;
    code?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    department?: string | Departments | null;
    id: string;
    mines_id?: string | null;
    name?: string | null;
    nesting_level?: number | null;
    object_type?: string | DisciplinesObjectTypes | null;
    object_view?: string | DisciplinesObjectViews | null;
    oop?: string | Oop | null;
    parent?: string | Disciplines | null;
    plan?: string | Plans | null;
    practice_type?: string | PracticeTypes | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type DisciplinesObjectTypes = {
    compose?: boolean | null;
    date_created?: string | null;
    date_updated?: string | null;
    disciplines?: any[] | Disciplines[] | null;
    id: string;
    mines_id?: string | null;
    name?: string | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type DisciplinesObjectViews = {
    date_created?: string | null;
    date_updated?: string | null;
    disciplines?: any[] | Disciplines[] | null;
    id: string;
    mines_id?: string | null;
    name?: string | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type EduForms = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    mines_id?: string | null;
    name?: string | null;
    plans?: any[] | Plans[] | null;
    prefix?: string | null;
    short_name?: string | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type EduLevels = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    mines_id?: string | null;
    name?: string | null;
    oops?: any[] | Oop[] | null;
    plans?: any[] | Plans[] | null;
    prefix?: string | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type Employees = {
    date_created?: string | null;
    date_updated?: string | null;
    fio?: string | null;
    id: string;
    mines_id?: string | null;
    plans?: any[] | PlansEmployees[] | null;
    post?: string | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type Faculties = {
    date_created?: string | null;
    date_updated?: string | null;
    departments?: any[] | Departments[] | null;
    id: string;
    mines_id?: string | null;
    name?: string | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type JunctionDirectusUsersDirectusRoles = {
    directus_roles_id?: string | DirectusRoles | null;
    directus_users_id?: string | DirectusUsers | null;
    id: number;
};

export type Oop = {
    active_plans?: any[] | Plans[] | null;
    children?: any[] | Oop[] | null;
    code?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    disciplines?: any[] | Disciplines[] | null;
    edu_level?: string | EduLevels | null;
    id: string;
    mines_id?: string | null;
    name?: string | null;
    parent?: string | Oop | null;
    plans?: any[] | Plans[] | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type Plans = {
    active_oop?: string | Oop | null;
    date_created?: string | null;
    date_updated?: string | null;
    disciplines?: any[] | Disciplines[] | null;
    edu_form?: string | EduForms | null;
    edu_level?: string | EduLevels | null;
    edu_time?: number | null;
    employees?: any[] | PlansEmployees[] | null;
    for_foreign?: boolean | null;
    id: string;
    mines_id?: string | null;
    oop?: string | Oop | null;
    prof_department?: string | Departments | null;
    qualification?: string | null;
    specialization?: string | null;
    status: string;
    title?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    year_start?: number | null;
};

export type PlansEmployees = {
    employees_id?: string | Employees | null;
    id: number;
    plans_id?: string | Plans | null;
};

export type PracticeTypes = {
    date_created?: string | null;
    date_updated?: string | null;
    disciplines?: any[] | Disciplines[] | null;
    id: string;
    mines_id?: string | null;
    name?: string | null;
    prefix?: string | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type CustomDirectusTypes = {
    departments: Departments;
    directus_activity: DirectusActivity;
    directus_collections: DirectusCollections;
    directus_dashboards: DirectusDashboards;
    directus_fields: DirectusFields;
    directus_files: DirectusFiles;
    directus_flows: DirectusFlows;
    directus_folders: DirectusFolders;
    directus_migrations: DirectusMigrations;
    directus_notifications: DirectusNotifications;
    directus_operations: DirectusOperations;
    directus_panels: DirectusPanels;
    directus_permissions: DirectusPermissions;
    directus_presets: DirectusPresets;
    directus_relations: DirectusRelations;
    directus_revisions: DirectusRevisions;
    directus_roles: DirectusRoles;
    directus_sessions: DirectusSessions;
    directus_settings: DirectusSettings;
    directus_shares: DirectusShares;
    directus_translations: DirectusTranslations;
    directus_users: DirectusUsers;
    directus_webhooks: DirectusWebhooks;
    disciplines: Disciplines;
    disciplines_object_types: DisciplinesObjectTypes;
    disciplines_object_views: DisciplinesObjectViews;
    edu_forms: EduForms;
    edu_levels: EduLevels;
    employees: Employees;
    faculties: Faculties;
    junction_directus_users_directus_roles: JunctionDirectusUsersDirectusRoles;
    oop: Oop;
    plans: Plans;
    plans_employees: PlansEmployees;
    practice_types: PracticeTypes;
};
