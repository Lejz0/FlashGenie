﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashGenie.Core.Exceptions
{
    public class ObjectIsNullException : Exception
    {
        public ObjectIsNullException(string message) : base(message) { }
    }
}
