import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { MonthAvailabilityItem } from '../../infra/interfaces/calendar';
import { months, weekDaysShort } from '../../infra/utils/date';
import client from '../../infra/services/client';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
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
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/30646629?s=460&u=18b54427adec2bc4d9e7b06f088fc6881d4fdb9a&v=4"
                alt="José Carlos"
              />
              <strong>José Carlos</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/30646629?s=460&u=18b54427adec2bc4d9e7b06f088fc6881d4fdb9a&v=4"
                  alt="José Carlos"
                />
                <strong>José Carlos</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/30646629?s=460&u=18b54427adec2bc4d9e7b06f088fc6881d4fdb9a&v=4"
                  alt="José Carlos"
                />
                <strong>José Carlos</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/30646629?s=460&u=18b54427adec2bc4d9e7b06f088fc6881d4fdb9a&v=4"
                  alt="José Carlos"
                />
                <strong>José Carlos</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/30646629?s=460&u=18b54427adec2bc4d9e7b06f088fc6881d4fdb9a&v=4"
                  alt="José Carlos"
                />
                <strong>José Carlos</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/30646629?s=460&u=18b54427adec2bc4d9e7b06f088fc6881d4fdb9a&v=4"
                  alt="José Carlos"
                />
                <strong>José Carlos</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/30646629?s=460&u=18b54427adec2bc4d9e7b06f088fc6881d4fdb9a&v=4"
                  alt="José Carlos"
                />
                <strong>José Carlos</strong>
              </div>
            </Appointment>
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
