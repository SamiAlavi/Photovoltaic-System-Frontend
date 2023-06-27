class AppSettings {
    static SESSION_KEY = "token";
    static PROJECT_KEY = "currentProject";

    static MapboxAccessToken = "pk.eyJ1Ijoic2FtaWFsYXZpIiwiYSI6ImNsaWxuM3E0NTBiODIzZ212OGR1aTNmMnQifQ.f-oxF72sSsV2I7-wwlVN2g";

    static RouteDefault = "";
    static RouteSignup = "signup";
    static RouteSignin = "signin";
    static RouteSignout = "signout";
    static RouteProject = "project";
    static RouteProduct = "product";
    static RouteProfile = "profile";
    static RouteDashboard = "dashboard";
    static RouteReport = "report";

    private static BaseUrl = "http://localhost:3000/";
    private static ApiUrl = `${this.BaseUrl}api/`;

    private static AuthUrl = `${this.ApiUrl}`;

    static SignupUrl = `${this.AuthUrl}${this.RouteSignup}`;
    static SigninUrl = `${this.AuthUrl}${this.RouteSignin}`;
    static SignoutUrl = `${this.AuthUrl}${this.RouteSignout}`;

    static ProjectUrl = `${this.ApiUrl}${this.RouteProject}`;
    static ProductUrl = `${this.ApiUrl}${this.RouteProduct}`;
    static UpdateProfileUrl = `${this.ApiUrl}${this.RouteProfile}`;
    static ProjectProductUrl = `${this.ProjectUrl}/${this.RouteProduct}`;
    static ProductReportUrl = `${this.ProjectProductUrl}/${this.RouteReport}`;
}

export default AppSettings;
