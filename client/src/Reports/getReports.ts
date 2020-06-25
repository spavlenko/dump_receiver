import axios from 'axios';
import moment from 'moment';

import { wrapPromise } from '../utils';
import { uniqBy, minBy, maxBy } from 'lodash';

export const getReports = () => wrapPromise(axios('/api/v1/events'));

export const MOCK_STACK = (`
.  0  Id: 5eac.3758 Suspend: 0 Teb: 0000003f54879000 Unfrozen
Call Site
ntdll!NtWaitForMultipleObjects
KERNELBASE!WaitForMultipleObjectsEx
*** WARNING: Unable to verify checksum for crashreporter.dll
KERNELBASE!WaitForMultipleObjects
crashreporter!CrashReporter::NamedPipeClient::ReportError
crashreporter!CrashReporter::EventProcessor::ProcessEvent
crashreporter!CrashReporter::ErrorHandler::HandleException
KERNELBASE!UnhandledExceptionFilter
ntdll!RtlUserThreadStart$filt$0
ntdll!_C_specific_handler
ntdll!RtlpExecuteHandlerForException
ntdll!RtlDispatchException
ntdll!RtlRaiseException
KERNELBASE!RaiseException
*** WARNING: Unable to verify checksum for test_app.exe
VCRUNTIME140D!_CxxThrowException
test_app!main
test_app!invoke_main
test_app!__scrt_common_main_seh
test_app!__scrt_common_main
test_app!mainCRTStartup
kernel32!BaseThreadInitThunk
ntdll!RtlUserThreadStart
`).trim().split('\n');

export interface RawReport {
  key: number,
  event_info: {
    event_type: string;
    exception_code: number;
    exception_description: string;
    process_id: number;
    event_time: number;
    executable_name: string;
    file: string;
    function: string;
    line: number;
    expression: string;
    message: string;
    stack_trace: string[];
  },
  application_info: {
    cmd_parameters: string;
    app_name: string;
    app_version: string;
  },
  user_id: string;
  user_name: string;
  computer_name: string;
  os_name: string;
};



export interface Report {
  key: string,
  eventType: string;
  exceptionDescription: string;
  eventTime: string;
  currentAppVersion: string;
  os: string;
  file: string;
  // origin: string;
  osArchitecture?: string;
  userName: string;
  hostName: string;
};

export const getGeneralInfo = (reports: RawReport[]) => {
  const users = uniqBy(reports, 'user_name');
  const firstReport = minBy(reports, 'event_info.event_time');
  const lastReport = maxBy(reports, 'event_info.event_time');

  return {
    total: reports.length,
    usersTotal: users.length,
    firstReport: parseDate(firstReport!.event_info.event_time),
    lastReport: parseDate(lastReport!.event_info.event_time)
  }
}

const parseDate = (date: number) => moment.unix(
  parseInt(date.toString().substring(0, 10))
).format('MM/DD/YYYY, hh:mm:ss')

export const reportMapper = ({key, event_info, application_info, user_name, computer_name, os_name }: RawReport): Report =>  {
  return ({
    key: key.toString(),
    eventType: event_info.event_type,
    exceptionDescription: event_info.exception_description,
    eventTime: parseDate(event_info.event_time),
    currentAppVersion: `${application_info.app_version}`,
    file: event_info.file,
    os: os_name,
    userName: user_name,
    hostName: computer_name,
  });
}

export const reportsMapper = (reports: RawReport[]): Report[] => reports.map(reportMapper);