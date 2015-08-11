using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace TGAS
{
    /// <summary>
    /// Class ConfigManager.
    /// </summary>
    public class ConfigManager
    {
        /// <summary>
        /// css文件和js文件的版本
        /// </summary>
        public static string CssJsVersion
        {
            get
            {
                return ConfigurationManager.AppSettings["CssJsVersion"];
            }
        }

        /// <summary>
        /// 是否使用云储存字段
        /// </summary>
        private static bool? _isCloudStorage = null;

        /// <summary>
        /// 是否使用云储存
        /// </summary>
        public static bool? IsCloudStorage
        {
            get
            {
                if (!_isCloudStorage.HasValue)
                {
                    _isCloudStorage = bool.Parse(ConfigurationManager.AppSettings["IsCloudStorage"]);
                }

                return _isCloudStorage;
            }
        }

        /// <summary>
        /// 根据配置把服务器本地路径转换为云路径
        /// </summary>
        /// <param name="orginLocalPath">源本地路径</param>
        /// <param name="isUsingDomain">若设为 <c>true</c>则使用当前请求域名</param>
        /// <param name="url">相对路径</param>
        /// <param name="isUsingHttps">是否使用Https</param>
        /// <returns>转换后的路径</returns>
        public static string CloudUrlConvertor(string orginLocalPath, bool isUsingDomain = false, Uri url = null, bool isUsingHttps = false)
        {
            if (IsCloudStorage.Value)
            {
                if (isUsingHttps)
                {
                    return "https://img01.ppmoney.net/" + orginLocalPath;
                }
                else
                {
                    return "http://img01.ppmoney.net/" + orginLocalPath;
                }
            }
            else
            {
                if (isUsingDomain && url != null)
                {
                    string domain = bool.Parse(ConfigurationManager.AppSettings["IsUserPort"] ?? "false") ? url.Authority : url.Host;
                    return url.Scheme + "://" + domain + "/" + orginLocalPath;
                }
                else
                {
                    return orginLocalPath;
                }
            }
        }
    }
}