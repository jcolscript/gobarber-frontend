import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Shedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import defaultAvatar from '../../assets/default-avatar.png';

import { useAuth } from '../../infra/store/AuthContext';
import { IMonthAvailabilityItem } from '../../infra/interfaces/calendar';
import { IAppointment } from '../../infra/interfaces/appointment';
import { months, weekDaysShort } from '../../infra/utils/date';
import client from '../../infra/services/client';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    IMonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    client
      .get(`/providers/${user?.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user]);

  useEffect(() => {
    client
      .get<IAppointment[]>(`/appointments/me`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormated: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDayAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const morningAppontments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppontments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => {
      isAfter(parseISO(appointment.date), new Date());
    });
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Logo GoBarber" />
          <Profile>
            <img
              src={user?.avatar_url ? user?.avatar_url : defaultAvatar}
              alt={user?.name}
            />
            <div>
              <span>Bem vindo</span>
              <strong>{user?.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Shedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDayAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={
                    nextAppointment?.user.avatar_url
                      ? nextAppointment?.user.avatar_url
                      : defaultAvatar
                  }
                  alt={nextAppointment?.user.name}
                />
                <strong>{nextAppointment?.user.name}s</strong>
                <span>
                  <FiClock />
                  {nextAppointment?.hourFormated}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppontments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppontments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormated}
                </span>

                <div>
                  <img
                    src={
                      appointment.user.avatar_url
                        ? appointment.user.avatar_url
                        : defaultAvatar
                    }
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppontments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppontments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormated}
                </span>

                <div>
                  <img
                    src={
                      appointment.user.avatar_url
                        ? appointment.user.avatar_url
                        : defaultAvatar
                    }
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Shedule>
        <Calendar>
          <DayPicker
            selectedDays={selectedDate}
            weekdaysShort={weekDaysShort}
            months={months}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
