using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;

namespace TGAS.Controllers
{
    /// <summary>
    /// Controller的基类，用于实现适合业务场景的基础功能
    /// </summary>
    /// <typeparam name="T"></typeparam>
    [BasicAuthentication]
    public abstract class ApiControllerBase : ApiController
    {
        /// <summary>
        /// 执行方法并捕获错误
        /// </summary>
        /// <param name="pInterface"></param>
        /// <param name="action"></param>
        protected HttpResponseMessage ExecuteTryCatch<VModel>(Func<VModel> action)
        {
            try
            {
                var vm = action.Invoke();
                var result = new { ok = true, message = "", data = vm };
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                var result = new { ok = false, message = ex.Message };
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
    }

    /// <summary>
    /// UserAuthModel
    /// </summary>
    public class UserAuthModel
    {
        public string Controller
        {
            get;
            set;
        }

        public string Actions
        {
            get;
            set;
        }
    }
}